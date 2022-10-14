const UpgradeAccountCompleted = (props:any) => {  

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const signMeta = params.get('signMeta');
  const savePlantoDB  = ()=>{
    
    
  }
  return (
    <div className="text-center">
    <p>Account Upgraded Successfully for {signMeta} </p>
     </div>
  )
}
export default UpgradeAccountCompleted;
  