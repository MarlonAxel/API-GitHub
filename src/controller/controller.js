const axios = require("axios");

const api = {
    baseUrl:'https://api.github.com/users',
    itemType: 'application/vnd.lime.document-select+json',
    type: 'application/vnd.lime.media-link+json',
}

const items = [];
const options = [];

module.exports = {

    async getInfoGitHub(request, response) {

        const {name} = request.params

        await axios.get(`${api.baseUrl}/${name}/repos`).then(res=>{
            const repos = res.data
            console.log(`${api.baseUrl}/${name}/repos`);
            repos.map(el =>{
                const image = el.owner.avatar_url
                const titleCard = el.name
                const subTitleCard = el.description
                const dateRepository = el.created_at

                if(el.language === 'C#'){

                    items.push({
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

                    items.sort((a,b)=>{
                        let aux1 = new Date(a.header.value.date)
                        let aux2 = new Date(b.header.value.date)
                        return aux1 - aux2
                    });
                }
            })

            return response.json({itemType: api.itemType,items})
            
        }).catch(err=>{
            console.log('Ocorreu algum erro na requisição:: ',err);
        })
    },
}

