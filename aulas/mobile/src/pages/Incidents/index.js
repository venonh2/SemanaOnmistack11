import React, { useState, useEffect } from 'react'; // fazendo o uso do useEffect para atualizar as coisas na tela
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native'; // o touchate é um tipo de botao que espcurece
// o flat list serve para fazer listangem para poder usar o scroll 
import { useNavigation, useRoute } from '@react-navigation/native';  // para poder uir para outras abas é o useHistory do react é usa com js
// quando o intl não estiver, basta npm install intl, é para formatação do RS ele é importado no app.js pq dai fica dispo para toda a apli
import api from '../../services/api' // import do api para conectar ffront e back

import logoImg from '../../assests/logo.png';

import styles from './styles';

import { Feather } from '@expo/vector-icons' // importando icones no expo ja vem


export default function Incindent() {
    const navigation = useNavigation(); // const do use navigation para pdoer usar ele
    const [incidents, setIncidents] = useState([]); // no react precisa do useState para poder adicionar valor as variavels
    const [total, setTotal] = useState(0);
    function navigateToDetail(incident) { // funcao para redirecionar para outra aba
        navigation.navigate('Detail', {incident}); // a funcao esta sendo usada no botao toucheble la em baixo
    } // veja o rota vai para Detail e leva junto o parametro incident com todos os atributos dele

    const [page, setPage] = useState(1); // arrumando para fazer carregamento igual facebook
    const [loading, setLoading] = useState(false);





    async function loadIncindents() {
        if(loading) { // isso serve para evitar que o usuario fique puchando para baixo sem parar
            return;
        }

        if(total > 0 && incidents.length == total) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page } // passando o numero da pagina 
        });

        setIncidents([...incidents, ...response.data]); // pegando os dados da api e colocando na variavel incidents, que foi declarada acima
        // ele esta anexando 2 vetores em 1 vetor, para poder fazer de maneira correta o load infinito
        setTotal(response.headers['x-total-count']);

        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => { // o useEffect é uma func que é disparada quando as variaveis que ela é dependente mudam, é usada para atualizar coisas na tela
        loadIncindents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> {total} casos </Text>
                </Text>
            </View>

            <Text style={styles.title}> Bem-Vindo </Text>
            <Text style={styles.description}> Escolha um dos casos abaixo e salve </Text>

            <FlatList
                style={styles.incidentsList}
                data={incidents} // é o array de daods que ia montar a lista
                showsVerticalScrollIndicator={false} // para a scroll não aparecer quando rollar para baixo
                onEndReached={loadIncindents}
                onEndReachedThreshold={0.2}
                keyExtractor={incident => String(incident.id)} // essa prop recebe cada um dos icencidents e retorna a informação unica de cada um deles o id no caso é igual o key do react
                
                renderItem={({ item: incident }) => ( // o render item é a funcao respnsavel por renderizar os items

                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}> ONG: </Text>
                        <Text style={styles.incidentValue}> {incident.nome}</Text>

                        <Text style={styles.incidentProperty}> CASO: </Text>
                        <Text style={styles.incidentValue}>{incident.descricao} </Text>

                        <Text style={styles.incidentProperty}> VALOR: </Text>
                        <Text style={styles.incidentValue}> 
                        {Intl.NumberFormat('pr-BR',  {
                              style: 'currency', 
                          currency: 'BRL'} )
                          .format(incident.valor)} </Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}> Ver mais detalhes</Text>
                            <Feather
                                name="arrow-right"
                                size={16}
                                color="#E02041"
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}