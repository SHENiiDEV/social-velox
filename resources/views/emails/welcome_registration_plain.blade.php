Welcome to Velox Play, {{ $user->name }}!

Your account has been successfully created.
Player User Code: {{ $user->user_code }}
Account Email: {{ $user->email }}
Starting SC Balance: {{ number_format($user->game_balance, 2) }} SC

We have credited your wallet with +100.00 SC Welcome Bonus.

Start playing now: {{ url('/') }}

© 2026 Velox Entertainment N.V. All rights reserved.
