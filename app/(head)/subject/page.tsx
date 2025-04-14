export default function SubjectPage({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const { code } = searchParams;

  return <div>과목 코드: {code}</div>;
}
