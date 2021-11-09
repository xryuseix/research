wasm-pack build
yarn install
cd www
yarn install
mv ../pkg/* node_modules/calculator/
yarn run start