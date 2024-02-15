'use client';
import { IonPage ,IonContent,IonItem, IonHeader, IonTitle, IonButton, IonButtons, IonToolbar, IonInput} from '@ionic/react';
import axios from 'axios';
import React,{useEffect, useRef, useState} from 'react';



export default function page(){
const [product,setProduct] =useState<any>(null);

const nameRef =useRef<HTMLIonInputElement>(null);
const buyPriceRef =useRef<HTMLIonInputElement>(null);
const sellPriceRef =useRef<HTMLIonInputElement>(null);

useEffect(()=>{
    getProduct();
},[]);

const getProduct =async()=>{
    await  axios.get("/product/api/" + id).then((res)=>{
        console.log("product Data",res.data[0]);
        setProduct(res.data[0]);
        
    })

}
const handleSave =async()=>{

    const formData = new FormData();
    formData.append('name',nameRef.current?.value?.toString() || "");
    formData.append('buyPrice',buyPriceRef.current?.value?.toString() || "");
    formData.append('sellPrice',sellPriceRef.current?.value?.toString() || "");
    formData.append('id', id.toString());

    await axios.patch("/product/api",formData).then((res)=>{
        console.log("product Update Response",res.data);
        window.location.href="/product";

        
    })
}

return (
    <div className="">
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                    Edit Page
                    </IonTitle>
                    <IonButtons slot="end">
                            <IonButton expand='block' onClick={()=>handleSave()}>Save</IonButton>
                    </IonButtons>
                </IonToolbar>

            </IonHeader>

            <IonContent>
                <IonItem>
                    <IonInput value={product?.Name}
                    placeholder='Name'
                    ref={nameRef}
                    labelPlacement='fixed' 
                    label='Name'
                    >
                    </IonInput>
                </IonItem>

                
                <IonItem>
                    <IonInput value={product?.BuyPrice}
                    placeholder='BuyPrice'
                    ref={buyPriceRef}
                    labelPlacement='fixed' 
                    label='BuyPrice'
                    >
                    </IonInput>
                </IonItem>

                <IonItem>
                    <IonInput value={product?.SellPrice}
                    placeholder='SellPrice'
                    ref={sellPriceRef}
                    labelPlacement='fixed' 
                    label='SellPrice'
                    >
                    </IonInput>
                </IonItem>
            </IonContent>
        </IonPage>
    </div>
)
}