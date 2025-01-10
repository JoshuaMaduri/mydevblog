import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGitHubData = createAsyncThunk(
    "github/fetchGitHubData",
    async () => {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN; 
        const headers = { 
            'Authorization': `Bearer ${token}`, 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        try {
            // Fetch user repositories
            const reposResponse = await fetch("https://api.github.com/user/repos", {
                headers: headers
            });

            if(!reposResponse.ok) {
                throw new Error(`Failed to fetch repositories: ${reposResponse.statusText}`)
            }

            const reposData = await reposResponse.json();


            const commitRequests = reposData.map( async (repo) => {
                try{
                    const commitResponse = await fetch(`https://api.github.com/repos/${repo.full_name}/commits`, {
                        headers: headers
                    })
                    
                    if (!commitResponse.ok) {
                        console.warn(`Failed to fetch commits for repo ${repo.full_name}: ${commitResponse.statusText}`);
                        return 0; 
                    }
    
                    const commits = await commitResponse.json()
    
                    
                    return commits.length

                } catch(error){
                    console.error(`Error fetching commits for repo ${repo.full_name}: ${error.message}`);
                    return 0;
                }
                

            })

            const commitCounts = await Promise.all(commitRequests)

            

            const totalCommits = commitCounts.reduce((accumulator, currentValue, index) => {
                const result = accumulator + currentValue;
                return result;
            }, 0);
            
            const repos = reposData.length


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