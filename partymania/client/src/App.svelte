<script lang="ts">
  import { socket } from "./lib/socket";
  let name = $state("");

  function sendTestMessage() {
    console.log(name);
    socket.emit("changeName", { text: name }); // you can define this later
  }
</script>

<h1>Party Game</h1>
<input bind:value={name} />
<button onclick={sendTestMessage}>Send Test</button>