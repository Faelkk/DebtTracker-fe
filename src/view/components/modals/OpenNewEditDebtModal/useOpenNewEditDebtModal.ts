export function useOpenEditNewDebtModal() {


    function onConfirm() {
        console.log("Divida deletada com sucesso!")
    }

    return { onConfirm,isLoading:false}
}