cd ../problem/calculator
wasm-pack build
cd ../../pages
yarn install
cp -r ../problem/calculator/pkg/ node_modules/calculator/
yarn run start