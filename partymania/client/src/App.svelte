<script lang="ts">
  import { socket } from "./lib/socket";

  function sendTestMessage() {
    console.log("Sending test event...");
    socket.emit("testEvent"); // you can define this later
  }
</script>

<h1>Party Game</h1>
<button on:click={sendTestMessage}>Send Test</button>