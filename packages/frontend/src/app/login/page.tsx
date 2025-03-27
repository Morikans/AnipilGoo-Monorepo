"use client";
import useAuth from "../hooks/useAuth";

const page = () => {
  const { user, loading, signUp, signIn, signOut } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {user ? (
        <div>
          <p>ようこそ、{user.email} さん！</p>
          <button onClick={signOut}>ログアウト</button>
        </div>
      ) : (
        <div>
          <h2>ログイン</h2>
          <button
            onClick={() =>
              signIn("shirousagi.morikan@gmail.com", "new-password")
            }
          >
            ログイン
          </button>
          <h2>新規登録</h2>
          <button
            onClick={() =>
              signUp("shirousagi.morikan@gmail.com", "new-password")
            }
          >
            新規登録
          </button>
        </div>
      )}
    </div>
  );
};

export default page;
