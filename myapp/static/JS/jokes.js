"use strict";
// API Card
// API Name: JokeAPI v2 (Safe Mode)
// Base URL: https://v2.jokeapi.dev/joke/Programming,Miscellaneous
// Endpoint used: /Programming,Miscellaneous?type=single&safe-mode&amount=10&contains=code
// HTTP method: GET
// Status code seen: 200
// Fields used: id, category, joke
// Relevance: Provides clean programming and tech jokes for students in the Web Technologies Community.
const statusEl = document.getElementById("status");
const resultsEl = document.getElementById("results");
const searchForm = document.getElementById("searchForm");
const queryInput = document.getElementById("queryInput");
const searchBtn = document.getElementById("searchBtn");
async function getJSON(url) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return (await response.json());
    }
    finally {
        clearTimeout(timer);
    }
}
function setStatus(text) {
    statusEl.textContent = text;
}
function createCard(item) {
    const card = document.createElement("div");
    card.className = "card";
    const badge = document.createElement("span");
    badge.className = "joke-category";
    badge.textContent = item.category || "Programming";
    const jokeText = document.createElement("p");
    jokeText.className = "joke-text";
    jokeText.textContent = item.joke;
    card.appendChild(badge);
    card.appendChild(jokeText);
    return card;
}
function render(items) {
    resultsEl.innerHTML = "";
    if (items.length === 0) {
        setStatus("No results found.");
        return;
    }
    items.forEach((item) => resultsEl.appendChild(createCard(item)));
    setStatus(`Loaded ${items.length} result(s).`);
}
function buildURL(query) {
    const BASE_URL = "https://v2.jokeapi.dev/joke/Programming,Miscellaneous";
    return `${BASE_URL}?type=single&safe-mode&amount=10&contains=${encodeURIComponent(query)}`;
}
async function search() {
    const query = queryInput.value.trim();
    if (!query) {
        setStatus("Please enter a search term.");
        return;
    }
    searchBtn.disabled = true;
    setStatus("Loading...");
    resultsEl.innerHTML = "";
    try {
        const data = await getJSON(buildURL(query));
        if (data.error || !data.jokes) {
            render([]);
        }
        else {
            render(data.jokes);
        }
        localStorage.setItem("lastJokeQuery", query);
    }
    catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
            setStatus("Load failed: Request timed out (5s)");
        }
        else {
            const msg = err instanceof Error ? err.message : "Unknown error";
            setStatus(`Load failed: ${msg}`);
        }
    }
    finally {
        searchBtn.disabled = false;
    }
}
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    search();
});
window.addEventListener("DOMContentLoaded", () => {
    const lastQuery = localStorage.getItem("lastJokeQuery");
    if (lastQuery) {
        queryInput.value = lastQuery;
        search();
    }
});
