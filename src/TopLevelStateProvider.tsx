import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { TabType } from "./Pages/CreditCardPage";
import { SectionType } from "./Pages/CreditCardPage/Analysis/SectionSwitcher";
import {
  CategorizedTransactionData,
  CategoryData,
  CurrentBalanceDatum,
  LiabilityItem,
  MoneyEvent,
  MoneyStream,
  PlaidTransactionInterface,
  RunningBalanceMapInterface,
  UserData,
} from "./utilities/interfaces";
import { streamsToEvents, valueForDay } from "./utilities/streamsToEvents";

// import sampleLiabilities from "./sampleLiabilities.json";

const DAYS_OUT = 180;

interface TopLevelState {
  /* All the streams for a user */
  streams: MoneyStream[];
  /* All the events (derived from streams) for a user */
  events: MoneyEvent[];
  /* An date-keyed object representing the projected balance for the user (derived from events)*/
  runningBalanceMap: RunningBalanceMapInterface;
  /* The async request to GET /moneystreams that then populates state */
  getStreams: () => void;
  /* The async request to GET /users/categories that then populates state */
  getCategories: () => void;
  /* The async request to POST /moneystreams that then populates state */
  saveStream: (stream: MoneyStream) => Promise<void>;
  /* The async request to DELETE /moneystreams that then populates state */
  deleteStream: (id: string) => Promise<void>;
  /* Is the UI currently fetching GET /moneystreams */
  fetchingStreams: boolean;
  /* Is the UI currently saving (POST) a stream*/
  savingStream: boolean;
  /* Is the UI currently deleting (DELETE) a stream*/
  deletingStream: boolean;
  /* Was there an error fetching streams */
  fetchingStreamsError: string;

  userData: UserData;

  openSavingsBreakdown: () => void;
  closeSavingsBreakdown: () => void;
  viewSavingsBreakdown: boolean;

  /* Is the UI currently fetching GET /balance */

  getLiabilities: () => void;
  liabilities: LiabilityItem[];
  /* The list of user bucket-ed Plaid categories  */
  categories: CategoryData[];
  /* The list of user bucket-ed Plaid transactions  */
  categorizedTransactions: CategorizedTransactionData[];
  /* The async request to POST /user/categories that marks a category as 'fun' | 'important' */
  submitCategory: (category: CategoryData) => void;

  submitCategorizedTransaction: (categorizedTransactionInfo: CategorizedTransactionData) => void;
  /* Is the UI currently saving a new category (and which category) */
  savingCategory: string | null;
  /* Is the UI currently saving a new categorized transaction (and which transaction) */
  savingCategorizedTransaction: string | null;
  /* Was there an error saving a categorization*/
  savingCategoryError: string;

  /* The starting balance for a user */
  balances: CurrentBalanceDatum[];
  /* The async request to POST /startingbalance that then populates starting balance*/
  submitStartingBalance: (amount: number, date: string) => void;
  /* Is the UI currently posting POST /startingbalance`  */
  savingStartingBalance: boolean;
  /* Was there an error saving the starting balance */
  savingStartingBalanceError: string;

  /*  What is the JavaScript calculated innerHeight of the device (Different than 100%vh in CSS due to URL browser bar) */
  innerHeight: number;

  acceptCreditCardFeature: () => Promise<void>;

  creditCardAnalysisPage: SectionType;
  setCreditCardAnalysisPage: (page: SectionType) => void;

  creditCardMode: TabType;
  setCreditCardMode: (tab: TabType) => void;

  allTransactions: PlaidTransactionInterface[];
}

const defaultData: TopLevelState = {
  allTransactions: [],
  creditCardAnalysisPage: "breakdown",
  setCreditCardAnalysisPage: (page: SectionType) => {},
  categorizedTransactions: [],
  getCategories: () => {},
  openSavingsBreakdown: () => {},
  closeSavingsBreakdown: () => {},
  viewSavingsBreakdown: false,
  submitCategorizedTransaction: (datum) => {},
  creditCardMode: "analysis",
  setCreditCardMode: (tab: TabType) => {},
  savingCategorizedTransaction: "",
  streams: [],
  events: [],
  runningBalanceMap: {},
  balances: [{ amount: 0, date: new Date().toString() }],
  liabilities: [],
  categories: [],

  userData: {
    balances: [{ amount: 0, date: new Date().toString() }],
    categories: [],
    hasCreditCardAccess: false,
    hasAcceptedCreditCardAccess: false,
  },

  savingStartingBalance: false,
  fetchingStreams: false,
  savingStream: false,
  deletingStream: false,
  savingCategory: null,

  fetchingStreamsError: "",
  savingCategoryError: "",
  savingStartingBalanceError: "",

  innerHeight: 0,

  getStreams: () => {},
  saveStream: (stream: MoneyStream) => Promise.resolve(),
  deleteStream: (id: string) => Promise.resolve(),
  getLiabilities: () => {},
  submitStartingBalance: (bal: number) => {},
  submitCategory: (category: CategoryData) => {},
  acceptCreditCardFeature: () => Promise.resolve(),
};

interface Props {
  children: React.ReactNode;
}

const DataContext = React.createContext<TopLevelState>(defaultData);

export const useData = () => React.useContext(DataContext);
export const DataProvider = ({ children }: Props) => {
  const [creditCardAnalysisPage, _setCreditCardAnalysisPage] = useState<SectionType>(
    defaultData.creditCardAnalysisPage
  );
  const [creditCardMode, _setCreditCardMode] = useState<TabType>(defaultData.creditCardMode);
  const [streams, setStreams] = useState<MoneyStream[]>(defaultData.streams);
  const [events, setEvents] = useState<MoneyEvent[]>(defaultData.events);
  const [runningBalanceMap, setRunningBalanceMap] = useState<RunningBalanceMapInterface>(
    defaultData.runningBalanceMap
  );
  const [userData, setUserData] = useState<UserData>(defaultData.userData);
  const [liabilities, setLiabilities] = useState<LiabilityItem[]>(defaultData.liabilities);
  const [fetchingStreams, setFetchingStreams] = useState<boolean>(defaultData.fetchingStreams);

  const [savingStream, setSavingStream] = useState<boolean>(defaultData.savingStream);
  const [viewSavingsBreakdown, setViewSavingsBreakdown] = useState<boolean>(
    defaultData.viewSavingsBreakdown
  );

  const openSavingsBreakdown = () => {
    setViewSavingsBreakdown(true);
  };
  const closeSavingsBreakdown = () => {
    setViewSavingsBreakdown(false);
  };

  const [deletingStream, setDeletingStream] = useState<boolean>(defaultData.deletingStream);

  const [fetchingStreamsError, setFetchingStreamsError] = useState<string>(
    defaultData.fetchingStreamsError
  );

  const [categories, setCategories] = useState<CategoryData[]>(defaultData.categories);
  const [categorizedTransactions, setCategorizedTransactions] = useState<
    CategorizedTransactionData[]
  >(defaultData.categorizedTransactions);
  const [savingCategory, setSavingCategory] = useState<string | null>(defaultData.savingCategory);
  const [savingCategorizedTransaction, setSavingCategorizedTransaction] = useState<string | null>(
    defaultData.savingCategorizedTransaction
  );

  const [savingCategoryError, setSavingCategoryError] = useState<string>(
    defaultData.savingCategoryError
  );

  const [balances, setBalances] = useState<{ amount: number; date: string }[]>(
    defaultData.balances
  );
  const [savingStartingBalance, setSavingStartingBalance] = useState<boolean>(
    defaultData.savingStartingBalance
  );
  const [savingStartingBalanceError, setSavingStartingBalanceError] = useState<string>(
    defaultData.savingStartingBalanceError
  );

  const [innerHeight, setInnerHeight] = useState<number>(0);
  const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();
  const [allTransactions, setTrasactions] = useState<PlaidTransactionInterface[]>(
    defaultData.allTransactions
  );

  const setCreditCardAnalysisPage = (page: SectionType) => {
    _setCreditCardAnalysisPage(page);
  };

  const setCreditCardMode = (tab: TabType) => {
    _setCreditCardMode(tab);
  };

  useEffect(() => {
    const mostRecentBalance =
      balances?.sort((balanceA, balanceB) =>
        moment(balanceA.date).isAfter(moment(balanceB.date)) ? -1 : 1
      )[0] || {};
    const startDate = mostRecentBalance.date || moment().format("YYYY-MM-DD");
    const startBalance = mostRecentBalance.amount || 0;
    const events = streamsToEvents(streams, DAYS_OUT, startDate, liabilities);
    const { dateToRunningTotalMap } = valueForDay(DAYS_OUT, events, startBalance, startDate);
    setEvents(events);
    setRunningBalanceMap(dateToRunningTotalMap);
  }, [streams, balances, liabilities]);

  const getLiabilities = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      const userid = user.sub;

      const liabilitiesResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/liabilities?userid=${userid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (liabilitiesResponse.status !== 200) {
        console.error("Non 200 from fetching liabilities");
        console.error(liabilitiesResponse.statusText);
      }
      const json = await liabilitiesResponse.json();
      if (!json) {
        throw new Error("response came back undefined");
      }

      setLiabilities(json.liabilities);
    } catch (err) {
      console.error("ERROR!!!! Fetching Liabilities");
      console.error(err);
    }
  }, [user, getAccessTokenSilently]);

  const deleteStream = useCallback(
    async (id: string) => {
      setDeletingStream(true);
      const token = await getAccessTokenSilently();
      const { sub } = user;
      const streamsResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/moneystreams?userid=${sub}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      const json = await streamsResponse.json();
      const { streams } = json;
      if (!streams) {
        setDeletingStream(false);
        throw new Error("response from deleteStream came back empty");
      }

      setStreams(streams);
      setDeletingStream(false);
      return Promise.resolve();
    },
    [user, getAccessTokenSilently]
  );

  const saveStream = useCallback(
    async (stream: MoneyStream) => {
      setSavingStream(true);
      const token = await getAccessTokenSilently();
      const { sub } = user;
      const streamsResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/moneystreams?userid=${sub}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stream }),
        }
      );

      const json = await streamsResponse.json();
      const { streams } = json;
      if (!streams) {
        setSavingStream(false);
        throw new Error("response from saveStram came back empty");
      }

      setStreams(streams);
      setSavingStream(false);
      return Promise.resolve();
    },
    [user, getAccessTokenSilently]
  );

  const getCategories = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      const userid = user.sub;

      const categoriesResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/users/categories?userid=${userid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await categoriesResponse.json();
      const { categories, categorizedTransactions } = json;
      if (!categories || !categorizedTransactions) {
        throw new Error("response came back undefined");
      }
      setCategories(categories);
      setCategorizedTransactions(categorizedTransactions);
    } catch (err) {
      console.error("ERROR!!! Fetching streams");
      console.error(err);
      setCategories([]);
      setCategorizedTransactions([]);
    }
  }, [user, getAccessTokenSilently]);

  const getStreams = useCallback(async () => {
    setFetchingStreamsError("");
    setFetchingStreams(true);
    try {
      const token = await getAccessTokenSilently();
      const userid = user.sub;

      const streamsResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/moneystreams?userid=${userid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await streamsResponse.json();
      const { streams, user: userInfo } = json;
      if (!streams || !userInfo) {
        throw new Error("response came back undefined");
      }
      setStreams(streams);

      if (userInfo.balances.length === 0) {
        setBalances([{ amount: 0, date: new Date().toString() }]);
      } else {
        setBalances(userInfo.balances);
      }
      setUserData(userInfo);
      setCategories(userInfo.categories);
      setCategorizedTransactions(userInfo.transactions);
      setFetchingStreams(false);
    } catch (err) {
      console.error("ERROR!!! Fetching streams");
      console.error(err);
      setStreams([]);
      setFetchingStreamsError(err);
      setFetchingStreams(false);
    }
  }, [user, getAccessTokenSilently]);

  const submitCategory = async (categoryInfo: {
    category: string;
    type: "fun" | "important" | "base";
  }) => {
    setSavingCategory(categoryInfo.category);
    try {
      const token = await getAccessTokenSilently();
      const userid = user.sub;
      const saveStartingBalanceResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/users/categories?userid=${userid}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: categoryInfo.category,
            type: categoryInfo.type,
          }),
        }
      );

      await getStreams();

      if (saveStartingBalanceResponse.status !== 200) {
        console.error("Non 200 from saving categories");
        console.error(saveStartingBalanceResponse.statusText);
        setFetchingStreamsError(saveStartingBalanceResponse.statusText);
        setSavingCategory(null);
      }
      setSavingCategory(null);
    } catch (err) {
      console.error("ERROR!!!! Saving Category");
      console.error(err);
      setSavingCategoryError(err);
      setSavingCategory(null);
    }
  };

  const submitCategorizedTransaction = async (categorizedTransactionInfo: {
    transactionId: string;
    type: "fun" | "important" | "base";
  }) => {
    setSavingCategorizedTransaction(categorizedTransactionInfo.transactionId);
    try {
      const token = await getAccessTokenSilently();
      const userid = user.sub;
      const saveStartingBalanceResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/users/categorizedtransactions?userid=${userid}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transactionId: categorizedTransactionInfo.transactionId,
            type: categorizedTransactionInfo.type,
          }),
        }
      );

      await getCategories();

      if (saveStartingBalanceResponse.status !== 200) {
        console.error("Non 200 from saving categories");
        console.error(saveStartingBalanceResponse.statusText);
        setSavingCategorizedTransaction("");
      }
      setSavingCategorizedTransaction("");
    } catch (err) {
      console.error("ERROR!!!! Saving Category");
      console.error(err);
      setSavingCategorizedTransaction("");
    }
  };

  const acceptCreditCardFeature = async () => {
    try {
      const token = await getAccessTokenSilently();
      const userid = user.sub;
      const acceptCreditCardResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/acceptcreditcardfeature?userid=${userid}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      await getStreams();

      if (acceptCreditCardResponse.status !== 200) {
        console.error("Non 200 from accepting credit card");
        console.error(acceptCreditCardResponse.statusText);
      }
    } catch (err) {
      console.error("ERROR!!!! Accepting Credit Card");
      console.error(err);
    }
  };

  const submitStartingBalance = async (amount: number, date: string) => {
    try {
      setSavingStartingBalance(true);
      const token = await getAccessTokenSilently();
      const userid = user.sub;
      const saveStartingBalanceResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/startingbalance?userid=${userid}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, date }),
        }
      );

      await getStreams();

      if (saveStartingBalanceResponse.status !== 200) {
        console.error("Non 200 from saving balance");
        console.error(saveStartingBalanceResponse.statusText);
        setSavingStartingBalanceError(saveStartingBalanceResponse.statusText);
      }
      setSavingStartingBalance(false);
    } catch (err) {
      console.error("ERROR!!!! Fetching Balance");
      console.error(err);
      setSavingStartingBalanceError(err);
    }
  };

  const getData = useCallback(async () => {
    try {
      await getLiabilities();
      await getStreams();
      await getCategories();
    } catch (err) {
      console.error("ERROR");
      console.error(err);
    }
  }, [getStreams, getLiabilities, getCategories]);

  useEffect(() => {
    setInnerHeight(window.innerHeight);
    const resizeListener = () => setInnerHeight(window.innerHeight);
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  useEffect(() => {
    const creditCards =
      liabilities
        ?.map((l) => l.liabilities)
        ?.flat()
        ?.filter((c) => !!c?.accountName) || [];

    const transactions = creditCards.map((c) => c.transactions).flat();
    setTrasactions(transactions);
  }, [liabilities]);

  useEffect(() => {
    if (isAuthenticated && user) {
      getData();
    }
  }, [user, getData, isAuthenticated]);

  useEffect(() => {
    setFetchingStreams(true);
  }, []);

  return (
    <DataContext.Provider
      value={{
        allTransactions,
        creditCardAnalysisPage,
        setCreditCardAnalysisPage,
        creditCardMode,
        setCreditCardMode,
        getCategories,
        streams,
        submitCategorizedTransaction,
        events,
        runningBalanceMap,
        categorizedTransactions,
        savingCategorizedTransaction,
        getStreams,
        saveStream,
        deleteStream,
        getLiabilities,
        liabilities,
        fetchingStreams,
        savingStream,
        deletingStream,
        fetchingStreamsError,
        categories,
        savingCategory,
        userData,
        savingCategoryError,
        submitCategory,
        acceptCreditCardFeature,
        balances,
        submitStartingBalance,
        savingStartingBalance,
        savingStartingBalanceError,
        innerHeight,
        viewSavingsBreakdown,
        openSavingsBreakdown,
        closeSavingsBreakdown,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
