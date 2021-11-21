cd ../problem/
cd calculator && wasm-pack build && cd ..
cd make10puzzle && wasm-pack build && cd ..
cd ..
cd website && yarn install
cp -r ../problem/calculator/pkg/ node_modules/calculator/
cp -r ../problem/make10puzzle/pkg/ node_modules/make10puzzle/