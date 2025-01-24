import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../lib/axios';

// Thunk untuk mengambil semua data ujian
export const fetchAllSoal = createAsyncThunk(
  "ujian/allSoal",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/allsoal");
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Menangani error
    }
  }
);

export const fetchSoalLPDP = createAsyncThunk(
  "ujian/soalLPDP",
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get("/allsoal");

      const soalLPDP = response.data.filter((ujian) => ujian.type === 'LPDP');

      return soalLPDP; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); 

    }
  }
)

export const fetchSoalBUMN = createAsyncThunk(
  "ujian/soalBUMN",
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get("/allsoal");

      const soalBUMN = response.data.filter((ujian) => ujian.type === 'BUMN');

      return soalBUMN; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); 

    }
  }
)

export const fetchSoalCPNS = createAsyncThunk(
  "ujian/soalCPNS",
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get("/allsoal");

      const soalCPNS = response.data.filter((ujian) => ujian.type === 'CPNS');

      return soalCPNS; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); 

    }
  }
)

export const selesaiUjian = createAsyncThunk(
  'ujian/selesaiUjian',
  async (ujian, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/selesaiujian', {ujian}, {
        headers: {
          Accept: 'application/form-data',
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json',
        },
      });
   

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to submit ujian');
        
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice Redux
const ujianSlice = createSlice({
  name: 'ujian',
  initialState: {
    allSoal: [],
    soalLPDP: [],
    soalBUMN: [],
    soalCPNS: [],
    loading: false,
    success: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSoal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSoal.fulfilled, (state, action) => {
        state.loading = false;
        state.allSoal = action.payload;
      })
      .addCase(fetchAllSoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSoalLPDP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSoalLPDP.fulfilled, (state, action) => {
        state.soalLPDP = action.payload;
        state.loading = false;
      })
      .addCase(fetchSoalLPDP.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchSoalBUMN.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSoalBUMN.fulfilled, (state, action) => {
        state.loading = false;
        state.soalBUMN = action.payload;
      })
      .addCase(fetchSoalBUMN.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSoalCPNS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSoalCPNS.fulfilled, (state, action) => {
        state.soalCPNS = action.payload;
        state.loading = false;
      })
      .addCase(fetchSoalCPNS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(selesaiUjian.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(selesaiUjian.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.error = null;
      })
      .addCase(selesaiUjian.rejected, (state, action) => {
        state.loading = false;
        state.success = null;
        state.error = action.payload;
      });
  },
});

export default ujianSlice.reducer;