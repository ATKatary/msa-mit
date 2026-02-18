import { FormField, SelectField } from './fields';
import { COLORS, THEME } from '../../constants';
import { useCustomState } from '../utils';
import { sendMessage } from '../api/contact';
import ResponsiveContact from "../responsive/contact";

import DateRangeIcon from '@mui/icons-material/DateRange';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { IconButton, InputAdornment } from '@mui/material';

/*** Global Constants ***/
const NAME = {MESSAGE: "contact-message"}
const ID = {NAME: "mailing-name", EMAIL: "mailing-subject", CLASS_YEAR: "mailing-class-year"}
const fieldStyle = {
    variant: "outlined",
    style: THEME.MAILING_LIST.FORM_FIELD.STYLE,
    inputStyle: THEME.MAILING_LIST.FORM_FIELD.INPUT_STYLE,
    labelStyle: THEME.MAILING_LIST.FORM_FIELD.LABEL_STYLE,
}

const contact = (event, classType, setNotification) => {
    const name = document.getElementById(ID.NAME).value;
    const email = document.getElementById(ID.EMAIL).value;
    const classYear = document.getElementById(ID.CLASS_YEAR).value;
    
    const subject = "Main-list join request";
    const message = "Sender would like to join mailing list\nTo add them please visit: https://msa.mit.edu/exec\n".replace(/\n/g, '\\n'); 

    if (email === "") setNotification({value: "Email required to send message", notify: true});
    else if (name === "") setNotification({value: "Name required to send message", notify: true});
    else if (classYear === "") setNotification({value: "Class Year required to send message", notify: true});
    else sendMessage(
        email, 
        subject, 
        message, 
        setNotification, 
        {
            name: `${name} (${classType} ${classYear})`
        }
    );
    return;
}

function MailingList({setNotification, ...props}) {
    const classTypes = ["Undergraduate", "Graduate", "Postdoc", "Faculty", "Researcher", "General", "Alumni"];

    const [headerValues, setHeaderValues] = useCustomState({name: null, email: null});
    const [bodyValues, setBodyValues] = useCustomState({classYear: null, type: classTypes[0]});

    const header = [
        {
            id: ID.NAME,
            label: "Name",
            placeholder: "Name",
            value: headerValues.name,
            meta: {icon: PersonOutlineIcon}
        },
        {
            id: ID.EMAIL,
            label: "Email",
            placeholder: "name@mit.edu",
            value: headerValues.email,
            meta: {icon: MailOutlineIcon}
        }
    ]

    return (
        <ResponsiveContact 
            style={{width: "100%"}}

            sendText="Request"
            sendClassName="flex justify-center width-100"
            sendBtnStyle={THEME.MAILING_LIST.SEND_BTN.STYLE}
            sendOnClick={(event) => contact(event, bodyValues.type, setNotification)}

            headerClassName="flex align-center justify-center"
            headerFields={
                <>
                    {header.map((field, i) => {
                        const {meta, ...fieldProps} = field;

                        return (
                            <FormField 
                                required
                                key={`mailing-header-${i}`}
                                {...fieldStyle}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <meta.icon style={{color: COLORS.GRAY_2}}/>
                                        </InputAdornment>
                                    )
                                }}
                                {...fieldProps}
                            />
                        )
                    }
                    )}
                </>
            }

            bodyClassName="flex align-center justify-center"
            bodyStyle={{marginBottom: "40px"}}
            bodyFields={
                <>
                    <FormField 
                        required
                        key={`mailing-body-1`}
                        {...fieldStyle}
                        id={ID.CLASS_YEAR}
                        placeholder="2023"
                        label="Class Year"
                        value={bodyValues.classYear}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <DateRangeIcon style={{color: COLORS.GRAY_2}}/>
                                </InputAdornment>
                            )
                        }}
                    />
                    <SelectField 
                        {...fieldStyle}
                        value={bodyValues.type}
                        displayStyle={{color: COLORS.WHITE}}
                        onChange={(event) => setBodyValues({type: event.target.value})}

                        items={classTypes.map((classType, i) => {
                            return {
                                value: classType,
                                name: classType
                            }
                        })}
                    />
                </>
            }
        />
    )
}

export default MailingList;