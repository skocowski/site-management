import axios from "axios";
import { useOwnerOf } from "../hooks/useOwnerOf";

export async function fetchMetadata(address: string) {
  try {
    const response = await axios.get(`https://corsproxy.org/?${address}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export const fetchNFT = async (tokenURI: any, setNft: any) => {
  if (tokenURI) {
    try {
      const data = await fetchMetadata(String(tokenURI));
      setNft(data);
    } catch (error) {
      console.error("Error fetching pirate data:", error);
    }
  }
};

export async function getMyCaptains(address: String, captainId: number) {
  for (let i = 0; i < captainId; i++) {}
}
