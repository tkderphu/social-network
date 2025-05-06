import ModalCustome from "../../components/modal/ModalCustom";

export  function ChangeNickNameForm(props: {conversationId: number, open: any, setOpen: any}) {
    return (
        <ModalCustome title="Create group conversation form"
            children={<>
                change nickname
            </>}
            show={props.open}
            onClose={() => props.setOpen(false)}
        />
    )
}

export  function ChangeThumbnailForm(props: {conversationId: number, open: any, setOpen: any}) {
    return (
        <ModalCustome title="Create group conversation form"
            children={<>
                change thumbnaik
            </>}
            show={props.open}
            onClose={() => props.setOpen(false)}
        />
    )
}

export  function CreateGroupConversationForm(props: { open: any, setOpen: any }) {

    return (
        <ModalCustome title="Create group conversation form"
            children={<>
                create group
            </>}
            show={props.open}
            onClose={() => props.setOpen(false)}
        />
    )

}

export function SeeMember(props: {conversationId: number, open: any, setOpen: any }) {
    return (
        <ModalCustome title="List members"
            children={<>
                create group
            </>}
            show={props.open}
            onClose={() => props.setOpen(false)}
        />
    )
}