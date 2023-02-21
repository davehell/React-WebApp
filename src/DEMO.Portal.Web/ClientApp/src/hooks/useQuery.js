import { useLocation } from "react-router-dom";

//vrací hodnotu parametru z url
//použití: url?id=5
//let query = useQuery(); let id = query.get("id");
function useQuery() {
  return new URLSearchParams(useLocation().search );
}

export default useQuery;
