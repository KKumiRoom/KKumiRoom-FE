const SubjectPage = ({ params }: { params: { subjectCode: string } }) => {
  return <div>과목 코드: {params.subjectCode}</div>;
};

export default SubjectPage;
