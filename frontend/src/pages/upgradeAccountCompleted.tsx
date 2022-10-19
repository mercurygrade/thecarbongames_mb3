
const UpgradeAccountCompleted = (props:any) => {  
  
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const signMeta = params.get('signMeta');
  const savePlantoDB  = ()=>{
    //test tempoarily =michaelscott.thecarbongames.testnet 

    
  }
  /*
  const UpdateUserPlanInfo = async()=>{
    const q = query(collection(db, "users"), where("email", "==",  ));

    const querySnapshot = await getDocs(q);
    let docID = '';
    querySnapshot.forEach((doc) => {
    // if email is you primary key then only document will be fetched so it is safe to continue, this line will get the documentID of user so that we can update it
      docID = doc.id;
    });
    const user = doc(db, "users", docID);

    // Set the "capital" field of the city 'DC'
    await updateDoc(user, {
        name: name,
        address: address
    });
}*/

  return (
    <div className="text-center">
    <p>Account Upgraded Successfully</p>
     </div>
  )
}
export default UpgradeAccountCompleted;
  