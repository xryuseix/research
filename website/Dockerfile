FROM rust:1-bookworm AS wasm
RUN rustup target add wasm32-unknown-unknown \
    && cargo install wasm-pack --locked
WORKDIR /problem
COPY problem/calculator ./calculator
COPY problem/make10puzzle ./make10puzzle
# Old wasm-bindgen versions cannot compile with current Rust.
RUN cd calculator && cargo update -p wasm-bindgen && wasm-pack build --release --target bundler \
    && cd ../make10puzzle && cargo update -p wasm-bindgen && wasm-pack build --release --target bundler

FROM node:24-bookworm-slim AS development
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=wasm /problem/calculator/pkg /problem/calculator/pkg
COPY --from=wasm /problem/make10puzzle/pkg /problem/make10puzzle/pkg
COPY website/package.json website/package-lock.json website/.npmrc ./
RUN npm ci
COPY website/ ./
EXPOSE 3000
CMD ["npm", "run", "dev"]
