[![Netlify Status](https://api.netlify.com/api/v1/badges/bae6a7aa-12b2-4ce6-9e07-880f75969ca4/deploy-status)](https://app.netlify.com/sites/pwastarter/deploys)



To update the versions file correctly


```sh
jq -n --arg greeting $(git rev-parse HEAD) --arg date "$(date)" --arg tag $(git describe --tags --abbrev=0) --arg message "$(git log -1 --pretty=%B)" '[{"hash":$greeting, "date":$date, "tag": $tag, "message":$message}]' > current_version.json && jq -s 'add' src/App/versions.json current_version.json > blah.json && cat blah.json > src/App/versions.json
```
