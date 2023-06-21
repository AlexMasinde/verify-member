export default function TextArea({
  inputLabel,
  onChange,
  error,
  value,
}: {
  inputLabel: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error: string;
  value: string;
}) {
  return (
    <div className="mt-[12px]">
      <p
        className={`text-[14px] mb-[5px] ${
          error.trim() === "" ? "" : "text-red-700"
        }`}
      >
        {error.trim() === "" ? inputLabel : error}
      </p>
      <textarea
        value={value}
        onChange={onChange}
        className="border border-gray-300 px-[18px] py-2 rounded-[6px] outline-none w-full lg:w-400 sm:ml-[0%]"
      />
    </div>
  );
}
