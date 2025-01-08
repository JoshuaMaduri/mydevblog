import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGitHubData = createAsyncThunk(
    "github/fetchGitHubData",
    async () => {
        const token = process.env.GITHUB_TOKEN; // Access token from .env
        const headers = { Authorization: `Bearer ${token}` };

        try {
            // Fetch user repositories
            const reposResponse = await fetch("https://api.github.com/user/repos", {
                headers,
            });

            const repos = reposResponse.data;

            // Fetch commit counts for each repository in parallel
            const commitRequests = repos.map((repo) =>
                fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits`, {
                    headers,
                })
            );
            const commitsResponses = await Promise.all(commitRequests);

            const totalCommits = commitsResponses.reduce((sum, res) => sum + res.data.length, 0);

            return { repos, totalCommits };
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Redux slice
const githubSlice = createSlice({
    name: "github",
    initialState: {
        repos: [],
        commitCount: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGitHubData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGitHubData.fulfilled, (state, action) => {
                state.loading = false;
                state.repos = action.payload.repos;
                state.commitCount = action.payload.totalCommits;
            })
            .addCase(fetchGitHubData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default githubSlice.reducer;