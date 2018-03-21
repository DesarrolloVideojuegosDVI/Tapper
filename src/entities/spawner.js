var Spawner = function(SpawnerData,callback) {
  this.SpawnerData = [];
  for(var i =0; i<SpawnerData.length; i++) {
    this.SpawnerData.push(Object.create(SpawnerData[i]));
  }
  this.t = 0;
  this.callback = callback;
};
Spawner.prototype.step = function(dt) {
  var idx = 0, remove = [], curShip = null;

  // Update the current time offset
  this.t += dt * 1000;

  // [ Start time,     4000, 500, 'step', { x: 100 } ]
  while((curShip = this.SpawnerData[idx]) &&
        (curShip[0] < this.t + 2000)) {
    // Check if we've passed the end time
    if(this.t > curShip[1]) {
      remove.push(curShip);
    } else if(curShip[0] < this.t) {
      // Get the enemy definition blueprint
      var enemy = enemies[curShip[3]],
          override = curShip[4];

      // Add a new enemy with the blueprint and override
      this.board.add(new Client(enemy,override));

      // Increment the start time by the gap
      curShip[0] += curShip[2];
    }
    idx++;
  }

  // Remove any objects from the SpawnerData that have passed
  for(var i=0,len=remove.length;i<len;i++) {
    var remIdx = this.SpawnerData.indexOf(remove[i]);
    if(remIdx != -1) this.SpawnerData.splice(remIdx,1);
  }

  // If there are no more enemies on the board or in
  // SpawnerData, this Spawner is done
  if(this.SpawnerData.length === 0 && this.board.cnt[OBJECT_CLIENT] === 0) {
    if(this.callback) this.callback();
  }

};
Spawner.prototype.draw = function(ctx) { };
