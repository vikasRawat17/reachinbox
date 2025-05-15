const EmailCard = ({ email }) => {
  const cleanSubject = email.subject?.split("|")[0].trim();

  return (
    <div className="bg-gray-800 text-white p-4 rounded-md shadow-md">
      <div className="flex justify-between text-sm text-gray-400 mb-1">
        <span>From: {email.fromEmail}</span>
        <span>{new Date(email.sentAt).toLocaleString()}</span>
      </div>
      <div className="text-md font-semibold">{cleanSubject}</div>
      <div
        className="mt-2 text-sm"
        dangerouslySetInnerHTML={{ __html: email.body }}
      />
    </div>
  );
};

export default EmailCard;
