import React from "react";

export default function UserProfilePage() {
  const user = {
    name: "Mohamed Thaha",
    email: "thaha1879@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=500&q=80",
    bio: "Frontend Developer | React & Tailwind enthusiast. Posting latest updates in tech & local news.",
    stats: { posts: 12, saved: 45, followers: 230 },
  };

  const myPosts = [
    { id: 1, title: "Local Festival Highlights", date: "Sep 29, 2025" },
    { id: 2, title: "React 19 Release: Key Features", date: "Sep 20, 2025" },
  ];

  const savedNews = [
    { id: 1, title: "India Wins World Cup", date: "Oct 1, 2025" },
    { id: 2, title: "AI Changing the Job Market", date: "Sep 28, 2025" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 mt-25">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-28 h-28 rounded-full object-cover shadow"
          />
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="mt-2 text-gray-700">{user.bio}</p>

            {/* Stats */}
            <div className="mt-4 flex justify-center sm:justify-start gap-6">
              <StatBox label="Posts" value={user.stats.posts} />
              <StatBox label="Saved" value={user.stats.saved} />
              <StatBox label="Followers" value={user.stats.followers} />
            </div>

            {/* Settings Button */}
            <button className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
              Account Settings
            </button>
          </div>
        </div>
      </div>

      {/* My Posts */}
      <div className="max-w-4xl mx-auto mt-6 bg-white rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold mb-3">My Posts</h3>
        <ul className="space-y-2">
          {myPosts.map((post) => (
            <li
              key={post.id}
              className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <p className="font-medium">{post.title}</p>
              <span className="text-xs text-gray-500">{post.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Saved News */}
      <div className="max-w-4xl mx-auto mt-6 bg-white rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold mb-3">Saved News</h3>
        <ul className="space-y-2">
          {savedNews.map((news) => (
            <li
              key={news.id}
              className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <p className="font-medium">{news.title}</p>
              <span className="text-xs text-gray-500">{news.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="text-center">
      <p className="text-xl font-bold">{value}</p>
      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  );
}
