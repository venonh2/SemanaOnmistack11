import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
// o use route serve para pegar informações da pagina atual da aplicação ou seja a pagina anterior
// O Linking importado ali acima é utilizado para abirir e enviar mensagem no whatsapp e outros app 


import styles from './styles'
import logoImg from '../../assests/logo.png';

// ele ta importando todas as funcaos do mail composer mas vai usar apenas para enviar email
import * as MailComposer from 'expo-mail-composer' // importando o mail compser apra poder usar ele

// veja no text logo abaixo do view com style={styles.incident}, ele transformou o style em uma array para poder passar mais de uma propriedade
export default function Detail() {
    const route = useRoute();
    const incident = route.params.incident; // aqui o que ele faz é pegar os parametros que essa rota recebeu no caso incident
    const navigation = useNavigation(); // o use navigation para poder mudar de pagina




    const message = `Olá ${incident.nome} estou entrando em contato pois gostaria de ajudar no caso
    ${incident.titulo} com o valor de ${Intl.NumberFormat('pr-BR', { style: 'currency', currency: 'BRL' })
            .format(incident.valor)}`

    function navigateBack() { // funcao para voltar para a pagina anterior
        navigation.goBack() // a função esta ali no Touchable é utilizada com um onPress
    }
    // sempre procure esses pacotes são uteis igual o passPort do express
    function sendMail() { // aqui é usado um pacote do proprio expo chamado send email, expo-mail-composer o noem dele
        MailComposer.composeAsync({
            subject: `Heroi do caso: ${incident.titulo}`,
            recipients: [incident.email],
            body: message, // a message com o texto ele definiu la em cima como const 
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather
                        name="arrow-left"
                        size={28}
                        color="#E82041"
                    />
                </TouchableOpacity>

            </View>

            <View style={styles.incident}>
                <Text style={styles.incidentProperty}> ONG: </Text>
                <Text style={styles.incidentValue}> {incident.nome} de {incident.cidade}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}> CASO: </Text>
                <Text style={styles.incidentValue}>{incident.descricao} </Text>

                <Text style={styles.incidentProperty}> VALOR: </Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('pr-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })
                        .format(incident.valor)} </Text>

            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}> Salve o dia</Text>
                <Text style={styles.heroTitle}> Seja o heroi deste caso</Text>

                <Text style={styles.heroDescription}> Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.action}
                        onPress={sendWhatsapp}>
                        <Text style={styles.actionText}> WhatsApp</Text>
                    </TouchableOpacity >

                    <TouchableOpacity
                        style={styles.action}
                        onPress={sendMail}>
                        <Text styke={styles.actionText}> E-mail </Text>
                    </TouchableOpacity>


                </View>
            </View>

        </View>
    )
}
// onPress={() => { }}>  assim só para por no codigo de tira e poem a funcao