type Props = { category: string; title: string; description: string };
export default function PageHeading({ category, title, description }: Props) {
  return (
    <div className="page-heading">
      <span className="eyebrow">{category}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
