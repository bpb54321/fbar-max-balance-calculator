"use client";

const accounts = ["Account 1", "Account 2"];

export default function SettingsPage() {
  return (
    <div>
      <h1>Settings Page</h1>
      <h2>Accounts to Include in Analysis</h2>
      <form>
        {accounts.map((account) => (
          <div key={account}>
            <label htmlFor={account}>{account}</label>
            <input
              type="checkbox"
              value={account}
              // checked={selectedItems.includes(item)}
              onChange={() => {}}
              id={account}
            />
          </div>
        ))}
      </form>
    </div>
  );
}
