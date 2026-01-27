export function useOpenEditNewDebtModal() {


    function onConfirm() {
        console.log("Divida confirmada com sucesso!")
    }

    return { onConfirm,isLoading:false}
}