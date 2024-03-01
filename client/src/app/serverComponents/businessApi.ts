const url = "http://localhost:4000/business";
export interface BusinessData {
  id: Number;
  businessName: String;
  ownerName: String;
  address: String;
  city: String;
  country: String;
  mobileNumber: Number;
  officeNumber: Number;
  email: String;
  category: String;
  liscence: String;
  description: String;
  password: String;
}

export async function getBusinesData() {
  // const data = await fetch(url)
  // const res = await data.json()
  //   if (!data) {
  //     return "No data found"
  //   }
  //   return res
  try {
    const data = await fetch(url);
    const res = await data.json();
    if (!data) {
      return "No data found";
    }
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function addBusinessData(params: BusinessData) {
  try {
    const data = await fetch(url + "/register", {
      method: "POST",
      body: JSON.stringify(params),
      headers: { "Content-type": "spplication/json" },
      mode: "cors",
    });

    const res = await data.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}
