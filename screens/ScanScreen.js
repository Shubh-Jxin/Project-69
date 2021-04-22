import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image, Touchable, requireNativeComponent } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import MyHeader from '../components/Header'

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCammeraPermissions : null,
            scanned : false,
            scannedData: '',
            buttonState: 'normal'
        }
    }

    getCameraPermissions = async ()=>{
        const {status}= await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCammeraPermissions: status==='granted',
            buttonState:'clicked',
            scanned:false
        });

    }

    handleBarCodeScanner = async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState: 'normal'
        })
    }

    render(){
        const hasCammeraPermissions= this.state.hasCammeraPermissions;
        const scanned= this.state.scanned;
        const buttonState=this.state.buttonState;

        if(buttonState==="clicked" && hasCammeraPermissions){
            return(
                <BarCodeScanner
                    onBarCodeScanned= {scanned ? undefined : this.handleBarCodeScanner}
                ></BarCodeScanner>
            )
        }

        else if(buttonState==="normal"){
        return(
           <View>
                <MyHeader title="QR Code Scanner"></MyHeader>
               <Image 
                 style={{
                    width:150,
                    height:150,
                    margin:25,
                    alignSelf:'center'
                    }}
                source={require('../assets/barcode.jpg')}
               ></Image>


               <Text style={{fontSize:20,alignSelf:'center'}}>{
                   hasCammeraPermissions===true ? this.state.scannedData: "Request Camera Permissions"
                }</Text>
               <TouchableOpacity
                    style={{backgroundColor:'cyan',margin:20,padding:15}}
                    onPress={this.getCameraPermissions}
               >
                   <Text style={{fontSize:20,alignSelf:'center'}}>
                       Scan QR Code
                   </Text>
               </TouchableOpacity>
           </View> 
        ) } 
    }
}