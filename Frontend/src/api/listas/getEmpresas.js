export const fetchEmpresas = async(url) => {
    const idGrupo = localStorage.getItem("idGrupo")
    try {
        const response = await fetch('http://localhost:8000/api' + url +
            new URLSearchParams({
                idGrupo
            }), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            }
        );


        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.log(err);
    }
};