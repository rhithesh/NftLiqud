"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import GitHubCalendar from "react-github-calendar";
import { FaStar, FaCodeBranch, FaUserFriends } from "react-icons/fa";
import Image from "next/image";

interface GitHubUser {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  public_repos: number;
  followers: number;
}

interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
}

interface GitHubStats {
  stars: number;
  forks: number;
}

const GitHubStats: React.FC<{ username: string }> = ({ username }) => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [stats, setStats] = useState<GitHubStats>({ stars: 0, forks: 0 });

  useEffect(() => {
    const fetchUserAndStats = async () => {
      try {
        const [userResponse, reposResponse] = await Promise.all([
          axios.get<GitHubUser>(`https://api.github.com/users/${username}`),
          axios.get<GitHubRepo[]>(`https://api.github.com/users/${username}/repos`),
        ]);

        setUser(userResponse.data);

        const repos = reposResponse.data;
        const totalStars = repos.reduce(
          (sum, repo) => sum + repo.stargazers_count,
          0
        );
        const totalForks = repos.reduce(
          (sum, repo) => sum + repo.forks_count,
          0
        );
        setStats({ stars: totalStars, forks: totalForks });
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };

    fetchUserAndStats();
  }, [username]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <Image
          src={user.avatar_url}
          alt={`${user.name || user.login}'s profile`}
          width={100}
          height={100}
          className="rounded-full mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.name || user.login}</h2>
          <p className="text-gray-600">@{user.login}</p>
          {user.bio && <p className="mt-2 text-gray-700">{user.bio}</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <FaStar className="text-yellow-400 text-3xl mb-2 mx-auto" />
          <p className="text-xl font-semibold">{stats.stars}</p>
          <p className="text-gray-600">Total Stars</p>
        </div>
        <div className="text-center">
          <FaCodeBranch className="text-blue-500 text-3xl mb-2 mx-auto" />
          <p className="text-xl font-semibold">{stats.forks}</p>
          <p className="text-gray-600">Total Forks</p>
        </div>
        <div className="text-center">
          <FaCodeBranch className="text-green-500 text-3xl mb-2 mx-auto" />
          <p className="text-xl font-semibold">{user.public_repos}</p>
          <p className="text-gray-600">Repositories</p>
        </div>
        <div className="text-center">
          <FaUserFriends className="text-purple-500 text-3xl mb-2 mx-auto" />
          <p className="text-xl font-semibold">{user.followers}</p>
          <p className="text-gray-600">Followers</p>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">Contribution Graph</h3>
      <GitHubCalendar username={username} />
    </div>
  );
};

export default GitHubStats;