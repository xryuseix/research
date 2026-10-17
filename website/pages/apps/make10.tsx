import dynamic from "next/dynamic";
import { Layout } from "../../components/Layout";
import PageHeading from "../../components/PageHeading";
const Make10Form = dynamic(() => import("../../components/make10puzzle"), {
  ssr: false,
  loading: () => (
    <p className="status" role="status">
      WebAssemblyを読み込み中…
    </p>
  ),
});
export default function Make10() {
  return (
    <Layout
      title="Make 10 Puzzle — Research"
      description="4つの数字で10をつくるテンパズルのソルバー"
    >
      <PageHeading
        category="PLAYGROUND / 02"
        title="Make 10 Puzzle"
        description="4つの数字を一度ずつ使って、答えを10に。組み合わせの中にある、小さな発見。"
      />
      <Make10Form />
    </Layout>
  );
}
