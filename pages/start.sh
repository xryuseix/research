wasm-pack build
yarn install
cd www
yarn install
mv ../pkg/* node_modules/pages/
yarn run start