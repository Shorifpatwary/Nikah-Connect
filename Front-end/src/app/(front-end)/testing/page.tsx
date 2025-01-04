const TestingPage = () => {
  return (
    <form className="flex-column flex gap-2">
      <input type="text" name="id" className=" border border-primary" />
      <input type="text" name="name" className=" border border-primary" />
      <input type="email" name="email" className=" border border-primary" />
      <button type="submit">submit</button>
    </form>
  );
};

export default TestingPage;
