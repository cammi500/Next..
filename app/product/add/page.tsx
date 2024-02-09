'use client';
import { IonPage ,IonContent,IonItem, IonHeader, IonTitle, IonButton, IonButtons, IonToolbar, IonInput} from '@ionic/react';
import axios from 'axios';
import React,{useRef} from 'react';


export default function page(){

    const nameRef = useRef<HTMLIonInputElement>(null);
    const buyPriceRef = useRef<HTMLIonInputElement>(null);
    const sellPriceRef = useRef<HTMLIonInputElement>(null);

 const handleSave =async()=>{
    const formData =new FormData();
    formData.append('name',nameRef.current!.value?.toString() || "");
    formData.append('buyPrice',buyPriceRef.current!.value?.toString() || "");
    formData.append('sellPrice',sellPriceRef.current!.value?.toString() || "");

    await axios.post("/product/api", formData).then((res)=>{
        console.log("Add Response" , res.data);
        if(res.data.status !== "error"){
            window.location.href="/product";

        }else{
            alert(res.data.error);
        }
        
    })
 }


 return (
    <div className="">
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Add Product</IonTitle>
                   <IonButtons  slot='end'>
                     {/* save btn */}
                     <IonButton onClick={handleSave}>Save</IonButton>
                   </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonItem>
                    <IonInput type='text' label='Name' labelPlacement='stacked' placeholder='Name' ref={nameRef}/>
                </IonItem>

                <IonItem>
                    <IonInput type='number' label='BuyPrice' labelPlacement='stacked' placeholder='BuyPrice' ref={buyPriceRef}/>
                </IonItem>

                <IonItem>
                    <IonInput type='number' label='SellPrice' labelPlacement='stacked' placeholder='SellPrice' ref={sellPriceRef}/>
                </IonItem>

            </IonContent>
        </IonPage>
    </div>
 )
}