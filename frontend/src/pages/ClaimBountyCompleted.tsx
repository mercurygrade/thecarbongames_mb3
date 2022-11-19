const ClaimBountyCompleted = (props: any) => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const signMeta = params.get("signMeta");

  return <>Bounty Claim Completed</>;
};
export default ClaimBountyCompleted;
