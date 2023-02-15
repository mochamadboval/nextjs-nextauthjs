export default function AuthButton(props) {
  const { isWaiting, name } = props;

  return (
    <>
      {isWaiting ? (
        <p className="bg-neutral-100 mt-4 py-3.5 rounded text-center text-neutral-700 text-sm">
          Memproses ...
        </p>
      ) : (
        <button className="bg-green-700 mt-4 py-3 rounded text-green-50">
          {name}
        </button>
      )}
    </>
  );
}
