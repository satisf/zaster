import React from "react";
import {FormControl, TextField, Button} from "@material-ui/core";
import {Link} from 'react-router-dom'

const fields = [
    {
        name: "productName",
        type: "text",
        label: "was hast du gekauft? "
    },
    {
        name: "price",
        type: "number",
        label: "was hast du bezahlt? "
    },
    {
        name: "shopName",
        type: "text",
        label: "in welchem Laden?"
    },
    {
        name: "location",
        type: "button",
        label: "aktuelle Position hinzufügen"
    },
    {
        name: "gtinCode",
        type: "button",
        label: "den Produkt Code Scannen"
    },
    {
        name: "category",
        type: "text",
        label: "zu welcher Kategorie gehört der Kauf? "
    },
    {
        name: "emotion",
        type: "string",
        label: "was hast du dabei gefühlt? "
    },
    {
        name: "dateOfPurchase",
        type: "date",
        label: "wann war der Kauf?"
    }
]

const textField = ({name, type, label}) => {
    return <TextField name={name} type={type} label={label} />
}

const AddPurchase = () => {
    return (
        <div>
            <Link to="/">zurück</Link>
            <FormControl>
                {fields.map(field => {
                    switch(field.type){
                        case "button":
                            return <Button>{field.label}</Button>
                        default:
                            return textField(field)
                    }
                })}
            </FormControl>
        </div>
    )
}

export default AddPurchase

