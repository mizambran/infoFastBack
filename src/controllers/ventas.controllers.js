



let token = process.env.TOKEN;


export const listarEmpresas = async(req, res) => {
    try {
        const respuesta = await fetch(`https://impedidos.infomanager.com.ar/api/v1/empresas`, {
            method:'GET',
            headers:{
                'Content-type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        if(!respuesta.ok){
            return res.status(500).json({mensaje:"No se pudo listar empresas"})
        }
        let datos = await respuesta.json()
        const empresas = datos
        res.status(200).json(empresas)
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"No se pudo listar las empresas"})
    }
}

export const listarClientes = async (req, res) => {
  try {
    let paginaActual = 1;
    let limit = 1000;
    let hayMasPaginas = true;
    const clientes = [];

    while (hayMasPaginas) {
      const respuesta = await fetch(
        `https://impedidos.infomanager.com.ar/api/v1/clientes?page=${paginaActual}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!respuesta.ok) {
        throw new Error(
          `Algo salió mal en la petición. Estado:${respuesta.status}`,
        );
      }
      const datos = await respuesta.json();
      const clientesDeEstaPagina = datos.results
      if(clientesDeEstaPagina && clientesDeEstaPagina.length > 0){
        clientes.push(clientesDeEstaPagina)
        paginaActual ++ 
      } else {
        hayMasPaginas = false
      }
    }
    const todosLosClientes = clientes.flat()
    console.log(todosLosClientes.length)
    res.status(200).json(todosLosClientes)
    
  } catch (error) {
    console.error(error)
    res.status(500).json({mensaje:"No se pudo listar todos los clientes"})
  }
};


