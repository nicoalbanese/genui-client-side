export const RandomUser = async () => {
  const response = await fetch("https://randomuser.me/api/");
  const data = await response.json();

  if (!data) {
    return <div>Failed to fetch user data</div>;
  }

  return (
    <div>
      <h2>Random User</h2>
      <p>
        Name: {data.name.first} {data.name.last}
      </p>
      <p>Email: {data.email}</p>
      <p>
        Location: {data.location.city}, {data.location.country}
      </p>
    </div>
  );
};

