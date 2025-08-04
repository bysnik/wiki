Если при выпеолнении слонирпования у вас происходит это:
[basealt@bystrovno-nb gitea]$ git clone gitea@192.168.56.10:admin/t342ewg4y4.git
Cloning into 't342ewg4y4'...
ssh: @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
ssh: @    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
ssh: @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
ssh: IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
ssh: Someone could be eavesdropping on you right now (man-in-the-middle attack)!
ssh: It is also possible that a host key has just been changed.
ssh: The fingerprint for the ED25519 key sent by the remote host is
SHA256:tWrhG8sQgkPJb6ZFZe/wSdZlM6ZkftFX6sTwxY7ereg.
ssh: Please contact your system administrator.
ssh: Add correct host key in /home/basealt/.ssh/known_hosts to get rid of this message.
ssh: Offending ECDSA key in /home/basealt/.ssh/known_hosts:10
ssh: Host key for 192.168.56.10 has changed and you have requested strict checking.
ssh: Host key verification failed.
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.

Как вариант попробуйте удалить старый ключ и сделать повторное клонирование:
ssh-keygen -R 192.168.56.10

У меня это произошло потому что я при клонировании не тот ЮРЛ написал, вместо ИП у меня локалхост был, но я этого не заметил и сделал Are you sure you want to continue connecting (yes/no/[fingerprint])? yes