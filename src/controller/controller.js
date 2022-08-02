const axios = require("axios");

/*Variável contendo a URL da api do gitHub, e os tipos de arquivos que serão usados na plataforma Take*/
const api = {
    baseUrl:'https://api.github.com/users',
    itemType: 'application/vnd.lime.document-select+json',
    type: 'application/vnd.lime.media-link+json',
}

var items = [];
const options = [];

module.exports = {

    //Função principal para buscar as informações dentro da API
    async getInfoGitHub(request, response) {

        //Limpa o array para não acumular dados repetidos a cada requisição
        items.length > 0  ? items.length = 0 :items
        
        const {name} = request.params

        //Requisição axios na API do gitHub passando o user como paramêtro da busca
        await axios.get(`${api.baseUrl}/${name}/repos`).then(res=>{
            const repos = res.data
            console.log(`${api.baseUrl}/${name}/repos`);
            repos.map(el =>{ // Percorre o objeto encontrado para filtrar e selecionar os dados que serão consumidos
                const image = el.owner.avatar_url
                const titleCard = el.name
                const subTitleCard = el.description
                const dateRepository = el.created_at

                //If(){} para pegar somente por uma linguagem 
                if(el.language == 'C#'){
                    
                    items.push({ // Adiciona os dados ao array
                        header:{
                            type:api.type,
                            value:{
                                title:titleCard,
                                text:subTitleCard,
                                type:"image/jpeg",
                                uri:image,
                                date: dateRepository
                            }
                           },options})

                    items.sort((a,b)=>{ // ordena as datas pelo de forma crescente
                        let aux1 = new Date(a.header.value.date)
                        let aux2 = new Date(b.header.value.date)
                        return aux1 - aux2
                    });
                }
            })
            //Retorna o array em json
            return response.json({itemType: api.itemType,items})
            
        }).catch(err=>{
            console.log('Ocorreu algum erro na requisição:: ',err);
        })
    },
}

