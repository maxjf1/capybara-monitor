
var state = {
    loading: true,
    error: false,
    cpu: 0,
    memory: { total: 0, used: 0, free: 0, computed: 0 },
    processes: [],
    network: []
}

var app = new Vue({
    el: '#app',
    data: state
})

function getState() {
    return new Promise(function (resolve, reject) {
        $.get('api')
            .done(function (data) {
                data.loading = false;
                updateState(data)
            })
            .fail(function (err) {
                updateState({ loading: false, error: err })
            })
            .always(getState)
    });
}
function updateState(newState) {
    $.extend(state, newState)
    state.processes.sort(function (p1, p2) {
        return p2.cpu - p1.cpu
    })
    state.network.sort(function (n1, n2) {
        return n1.interface > n2.interface
    })
}

getState();