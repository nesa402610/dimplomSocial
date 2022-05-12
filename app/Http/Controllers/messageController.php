<?php

namespace App\Http\Controllers;

use App\Models\dialoges;
use App\Models\messages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class messageController extends Controller
{
    public function getMessages(Request $request)
    {
        $fromMessages = messages::where('user_id', Auth::user()->id)->where('acceptor_id', $request->acceptor_id)->get();
        $toMessages = messages::where('user_id', $request->acceptor_id)->where('acceptor_id', Auth::user()->id)->get();
        $combined = $fromMessages->concat($toMessages);


        foreach ($combined as $item) {
            $combined->user = $item->user->name;
            $combined->acceptor = $item->acceptor->name;
        }

        return $combined->sortBy('id')->unique();
    }

    public function sendMessage(Request $request)
    {
        $message = new messages();
        $message->user_id = Auth::user()->id;
        $message->acceptor_id = $request->acceptor_id;
        $message->message_text = $request->message;
        $message->save();
        $message->user;
        return response()->json($message);
    }

    public function getDialogues()
    {
        $dialogues = dialoges::where('dialogue_user_id', Auth::user()->id)->get();
        foreach ($dialogues as $item) {
            $dialogues->acceptor = $item->acceptor->name;
        }
        return response()->json($dialogues);
    }

    public function startDialogue(Request $request)
    {
        $dialogueFrom = dialoges::firstornew(['dialogue_user_id' => Auth::user()->id, 'dialogue_acceptor_id' => $request->userID]);
        $dialogueTo = dialoges::firstornew(['dialogue_user_id' => $request->userID, 'dialogue_acceptor_id' => Auth::user()->id]);
        $dialogueFrom->save();
        $dialogueTo->save();

    }
}
