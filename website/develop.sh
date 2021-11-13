cd ../problem/calculator
wasm-pack build
cd ../../website
yarn install
cp -r ../problem/calculator/pkg/ node_modules/calculator/