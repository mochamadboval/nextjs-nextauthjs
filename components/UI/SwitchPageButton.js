import Link from "next/link";

export default function SwitchPageButton(props) {
  const { name, url } = props;

  return (
    <>
      <p className="mt-3 text-center text-sm">atau</p>
      <Link
        href={url}
        className="block border border-neutral-900 mt-3 py-3 rounded text-center w-full"
      >
        {name}
      </Link>
    </>
  );
}
